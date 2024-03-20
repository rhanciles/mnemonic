import $ from "jquery";
import moment from "moment";
import { html, render } from "lit";
import { useState, useEffect } from "react";
import { LitElement, ReactiveElement } from "lit";
import { mnem_list_backend } from "declarations/mnem_list_backend/index.js";

ReactiveElement.disableWarning?.("migration");
LitElement.disableWarning?.("change-in-update");

class App {
  constructor() {
    this.render();
  }
  //Create function to handle form field entries.
  handleFormSubmit = async (e) => {
    e.preventDefault();

    var mnemListEl = $("#mnem-list");
    var mnemItem = $("#mnem-input").val();

    // const entry = mnemItem;
    // this.mnemItem = await mnem_list_backend.addEntry(args);
    // this.#render();

    // Insert list of items created dynamically.
    var mnemListItemEl = $(
      '<li class="flex-row justify-space-between align-center p-2 bg-light text-dark">'
    );

    // var listId = 0;
    // listId = mnemListItemEl.attr("id");
    // listId += 1;

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
    //   if (saving) {
    //     formList(Iter.toArray(mnemListEl.entries()));
    //     mnemListEl(backendActor.updateList(entry));
    //   }
    // }, [mnemListEl]);

    const getEntry = async () => {
      const [list, setList] = useState([]);
      try {
        list(await backendActor?.getList());
        setList(Iter.toArray(mnemListEl.entries()));
      } catch (error) {
        console.log("Error getting list:", error);
      }
    };

    if (backendActor) {
      getEntry();
    }

    var currentDate = moment().format("ddd Do MMM YYYY");
    $("#currentDay").text(currentDate);

    //=========================================================

    var deleteBtn = $(".delete-item-btn");

    deleteBtn.on("click", function () {
      // get the parent `<li>` element from button clicked and remove it
      $(this).parent("li").remove();

      //========================================================
    });
  };

  //Render the HTML entries to load web page.
  render() {
    let body = html`
      <main class="my-5 mx-auto">
        <h1>mnemonic</h1>
        <hr />

        <h2>
          Add an item to the list.<span class="today" id="currentTime"></span>
        </h2>
        <form id="mnem-form">
          <input
            type="text"
            class="form-input w-100"
            id="mnem-input"
            name="mnem-input"
            placeholder="Enter item details"
          />
          <button class="btn btn-info" type="submit">Add Item</button
          ><span class="today" id="currentDay"></span>
        </form>
        <ul id="mnem-list"></ul>
      </main>
    `;

    //Render the DOM to pick up interactions of the user.
    render(body, document.getElementById("root"));
    document.querySelector("form");
    document.addEventListener("submit", this.handleFormSubmit);
  }
}

// Set current time to update dynamically
var update = function () {
  var currentTime = moment().format("LTS");
  $("#currentTime").text(currentTime);
  setTimeout(update, 1000);
  // setInterval or setTimeout can be used.
};
update();

export default App;
