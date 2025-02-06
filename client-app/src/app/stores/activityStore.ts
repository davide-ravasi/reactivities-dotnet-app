import { action, makeObservable, observable } from "mobx";

export default class ActivityStore {
  title = "Hello from Mobx!";
  setTitle: () => void;

  constructor() {
    // use makeAutoObservable to make all properties observable
    // auto means that MobX will automatically detect
    //  which properties are used in the component
    // if is a FUNCTION, it will be an ACTION
    // if has a GET prefix, it will be a COMPUTED value
    // if is a PROPERTY, it will be an OBSERVABLE
    // and is a REACTION when is inside constructor
    // and has an action to a property that is an observable
    makeObservable(this, {
      title: observable,
      setTitle: action.bound,
    });

    this.setTitle = () => {
      this.title = this.title + "!";
    };
  }
}

// different Mobx properties
// OBSERVABLE: a property that is observable
// ACTION: a function that changes the state
// COMPUTED: a function that returns a computed value
// REACTION: a function that reacts to changes in the state
