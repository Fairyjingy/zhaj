const getters = {
    elements: state => state.actions.getBtn.getUserBtn(),
    user_permissions: state => state.actions.getBtn.getUserBaseData(),
  }
  
  export default getters
  