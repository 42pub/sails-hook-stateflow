import afterHook from "./afterHook";
export default function ToInitialize(sails: any) {
  return function initialize(cb) {
    // TODO: Добавть в конфиг очередь загрузки
    //sails.after(['hook:services:loaded'], () => {
      afterHook(sails);
    //});
    return cb();
  };
}