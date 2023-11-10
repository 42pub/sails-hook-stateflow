## States
**state**, just a unique string that is written to a specific field in the model,

> Recommendation: Name the site so that the name answers the question: what is happening with your object now?

## Routes and rules - Routes and Navigation rules.

**Routes** is where it can go from this state.

**Transition rules** are methods that will be called before afterState() in order to identify potential transition routes. The route code is executed before the next state is validated. To stop the transition, just call throw in one of the rules.

> Recommendation: do not perform actions that modify data, since the transition rule can be canceled if the transition for some reason did not take place.


Jump queue:
1.stateValidation()
2. Updates the state field in the model
3. inState() of the state you have moved to
4. afterState() of the previous state

##Validations

`stateValidation()` validation when entering a state

Similar to beforeValidation conditions. Throw an error to fail `stateValidation` function. In other cases it will pass you further, to `inState` function.

> note: To jump to a state, all functions must return `true`.

### inStateCallback

`inStateCallback()` method that will be called when entering the state

> note: errors are ignored

###after state callback

`afterState()`
 
> note: errors are ignored

### TODO
1. Add states by config 🗹
2. Add/Remove states by API 🗹
3. Add/Remove routes by API 🗹
4. Validation beforeNext() 🗹
5. Select next state by cutom routes 🗹
6. List of all routes
7. error when create model with not startState



### Config


```

//const State = require('sails-hook-stateflow').State;
module.exports.stateflow = {
  models: {
    /** If no model defined in sails.config.stateflow, hook use Order model */

    NotOrder: {
      /** default state */
      stateField: "not_state",
      
      /** Create attribute of waterline model with required option. by default false*/
      waterlineRequired: true

      /** Generate init states */
      states: {
        alpha: ["beta"],
        beta: ["gamma"],
        gama: ["zeta"],
        zeta: ["alpha"],
      },
    },

    Order: {
      /** if you set statrtState you must make waterlineRequired = false */
      startState: "ONE",
      states: {
        ONE: ["TWO"],
        TWO: ["THREE", "FOUR"],
        TRHEE: ["ONE", "FOUR"],
        FOUR:[],
      },
    },
  },
};


```
1. after creation, you need to do next to start the first state, if created immediately with the state, then it gets that inState will never be called.

This module works with dark-sails patches

### Run only by 'stateflow:runHook' event
If you want stateflow to run only after `stateflow:runHook` event, use runOnlyByEvent flag in config. Example:
```
module.exports.stateflow = {
    models: ...
    runOnlyByEvent
}
```
