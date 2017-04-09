/// <reference types="zone.js" />
/// <reference types="meteor-typings" />
/// <reference types="@types/underscore" />

declare module '*.html' {
  const template: string;
  export default template;
}

declare module '*.scss' {
  const style: string;
  export default style;
}

declare module '*.less' {
  const style: string;
  export default style;
}

declare module '*.css' {
  const style: string;
  export default style;
}

declare module '*.sass' {
  const style: string;
  export default style;
}

declare module "meteor/alanning:roles" {
  export module Roles {
    function userIsInRole(id?: any,value?: any): boolean{  }
    function addUsersToRoles(id?: any,value?: any): boolean{ }
  }
}
