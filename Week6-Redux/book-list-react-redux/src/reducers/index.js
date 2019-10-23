import { combineReducers } from "redux";

const rootReducer = combineReducers({
  books: function() {
    return [
      { title: "Harry Potter and the Chamber of Secrets", pages: 357 },
      { title: "Hunger Games", pages: 387 },
      { title: "JavaScript: The Good Parts", pages: 176 },
      { title: "Clojure for the Brave and True", pages: 329 }
    ];
  },
  activeBook: function(state = null, action) {
    switch (action.type) {
      case "BOOK_SELECTED":
        return action.payload;
    }

    return state;
  }
});

export default rootReducer;