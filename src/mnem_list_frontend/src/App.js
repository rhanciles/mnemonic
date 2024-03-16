import $ from "jquery";
import { html, render } from "lit";
import { LitElement, ReactiveElement } from "lit";
import { mnem_list_backend } from "declarations/mnem_list_backend";
//import logo from "./logo2.svg";

ReactiveElement.disableWarning?.("migration");
LitElement.disableWarning?.("change-in-update");
// MyElement.disableWarning?.("change-in-update");

class App {
  //greeting = "";

  constructor() {
    this.#render();
  }

  #handleFormSubmit = async (e) => {
    e.preventDefault();

    var mnemListEl = $("#mnem-list");

    var mnemItem = $("#mnem-input").val();

    const entry = document.getElementById("mnem-input").value;
    this.mnemItem = await mnem_list_backend.addEntry(entry);
    this.#render();

    // Insert list of items created dynamically.
    var mnemListItemEl = $(
      '<li class="flex-row justify-space-between align-center p-2 bg-light text-dark">'
    );

    mnemListItemEl.text(mnemItem);

    // add delete button to remove mnem list item
    var mnemListBtnEl = $(
      '<button class="btn btn-danger btn-small delete-item-btn">Remove</button>'
    );

    mnemListItemEl.append(mnemListBtnEl);

    // print to the page
    mnemListEl.append(mnemListItemEl);

    // clear the form input element
    $('input[name="mnem-input"]').val("");

    var deleteBtn = $(".delete-item-btn");

    deleteBtn.on("click", function () {
      // get the parent `<li>` element from button clicked and remove it
      $(this).parent("li").remove();
    });
  };

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
    render(body, document.getElementById("root"));
    document.querySelector("form");
    document.addEventListener("submit", this.#handleFormSubmit);
  }
}

export default App;
