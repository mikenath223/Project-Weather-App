import { selectQuery } from "./dom-interface"


const iconSwitch = (id) => {
  let icon = selectQuery('.wi')
  let listClass = icon.classList;
  icon.classList = `wi wi-owm-${id}`
}

export { iconSwitch };