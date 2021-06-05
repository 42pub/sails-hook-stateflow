import afterHook from "./afterHook";
export default function ToInitialize(sails: any) {
  return function initialize(cb) {
    sails.after(['hook:orm:loaded'], () => {
      afterHook(sails);
    });
    return cb();
  };
}