import afterHook from "./afterHook";
export default function ToInitialize(sails: any) {
  return function initialize(cb) {
    if (sails.config.stateflow && sails.config.stateflow.runOnlyByEvent === true) {
      sails.once('stateflow:runHook', () => {
        afterHook(sails);
      });
    } else {
      // TODO: Добавть в конфиг очередь загрузки
      sails.after(['hook:http:loaded'], () => {
        afterHook(sails);
      });
    }

    return cb();
  };
}
