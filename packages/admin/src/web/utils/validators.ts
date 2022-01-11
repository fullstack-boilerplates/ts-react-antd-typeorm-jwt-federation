export const getRangeValidator = (min: number, max: number) => (val: string) => {
  if (val.length < min) throw `长度最少${min}位 | min length ${min}`
  if (val.length > max) throw `长度最大${max}位 | max length ${max}`
}

export const nameValidator = (val: string) => {
  getRangeValidator(1, 32)(val)
}