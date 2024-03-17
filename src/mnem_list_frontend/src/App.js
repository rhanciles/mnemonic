import $ from "jquery";
import { html, render } from "lit";
import { useState, useEffect } from "react";
import { LitElement, ReactiveElement } from "lit";
import { mnem_list_backend } from "declarations/mnem_list_backend";

ReactiveElement.disableWarning?.("migration");
LitElement.disableWarning?.("change-in-update");

class App {
  constructor() {
    this.#render();
  }
  //Create function to handle form field entries.
  #handleFormSubmit = async (e) => {
    e.preventDefault();

    var mnemListEl = $("#mnem-list");
    var mnemItem = $("#mnem-input").val();

    // const entry = mnemItem;
    // this.mnemItem = await mnem_list_backend.addEntry(args);
    // this.#render();

    // Insert list of items created dynamically.
    var mnemListItemEl = $(
      '<li class="flex-row justify-space-between align-center ui-state-default p-2 bg-light text-dark">'
    );

    mnemListItemEl.text(mnemItem);

    // add delete button to remove mnem list item
    var mnemListBtnEl = $(
      '<button class="btn btn-danger btn-small delete-item-btn">Remove</button>'
    );

    mnemListItemEl.append(mnemListBtnEl);

    // create a dynamic list
    mnemListEl.append(mnemListItemEl);

    // clear the form input element
    $('input[name="mnem-input"]').val("");

    //=========================================================

    const { backendActor } = mnem_list_backend;
    // const [saving, setSaving] = useState(false);
    // const [entry, setEntry] = useState("");

    //=========================================================

    const formList = async () => {
      const [saving, setSaving] = useState(false);
      const [entry, setEntry] = useState("");

      if (backendActor) {
        try {
          setSaving(true);
          let listItem = {
            mnemItem: entry,
          };
          await backendActor.addEntry(listItem);
          setEntry("");
          formList();
        } catch (error) {
          console.log("Error adding text:", error);
          setSaving(false);
        }
      }
    };

    // useEffect(() => {
    //   mnemListEl = backendActor.updateList(entry);
    // });

    const getEntry = async () => {
      const [list, setList] = useState([]);
      try {
        const res = await backendActor?.getList();
        if (res) {
          setList(res);
        } else if (list) {
          setList(Iter.toArray(mnemListEl.entries()));
        }
      } catch (error) {
        console.log("Error getting list:", error);
      }
    };

    if (backendActor) {
      getEntry();
    }

    //=========================================================

    var deleteBtn = $(".delete-item-btn");

    deleteBtn.on("click", function () {
      // get the parent `<li>` element from button clicked and remove it
      $(this).parent("li").remove();

      //========================================================
    });
  };

  //Render the HTML entries to load web page.
  #render() {
    let body = html`
      <main class="my-5 mx-auto">
        <h1>mnemonic</h1>
        <hr />

        <h2>Add an item to the list.</h2>
        <form id="mnem-form">
          <input
            type="text"
            class="form-input w-100"
            id="mnem-input"
            name="mnem-input"
            placeholder="Enter item details"
          />
          <button class="btn btn-info" type="submit">Add Item</button>
        </form>

        <ul id="mnem-list"></ul>
      </main>
    `;

    //Render the DOM to pick up interactions of the user.
    render(body, document.getElementById("root"));
    document.querySelector("form");
    document.addEventListener("submit", this.#handleFormSubmit);
  }
}

export default App;
