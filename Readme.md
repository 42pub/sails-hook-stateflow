## States - Стейт 
**состояние**, просто уникальная строка котоая записывается в определенное поле в моделе, 

> Рекомендация: Называйте сейт так чтобы название  отвечало на вопрос: что сейчас происходит с вашим обектом?

## Routes and rules - Маршруты и Правила перехода. 

**Маршруты** это то куда может перейти с этого стейта. 

**Правила перехода** - это методы которые будут вызваны пред afterState(), для того чтобы выявить потенциальные маршруты прехода. Код маршрута выполняется перед валидацией следующего стейта. Чтобы прекратить переход достаточно вызвать throw в одном из rules.

> Рекомендация: не выполняйте действия модифицирующие данные, так как правило перехода может быть отменено, если переход по какимто причинам не состоялся. 

## Validations

`stateValidation()` проверка при входе на стейт

Массив с функцями которые могут вернуть лож\истина, чтобы перейти на стейт нужно выполнить все функции положительно. Это похоже на условия beforeValidation

> примичание: Чтобы перейти на стейт нужно чтобы все функции вернули `true`.

### inStateCallback

`inStateCallback()` метод который будет вызван при входе на стейт

> примичание: ошибки игнорируются

### after state callback

`afterState()`
 
> примичание: ошибки игнорируются

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
      /** Default state */
      stateField: "not_state",
      
      /** Create attribute of waterline model with required option. by default false*/
      waterlineRequired: true,

      /** Generate init states */
      states: {
        alpha: ["beta"],
        beta: ["gama"],
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
        FOUR: [],
      },
    },
  },
};


```

