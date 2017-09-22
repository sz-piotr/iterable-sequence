import fi from './index'

fi.from([1, 2, 3])
  .map(value => value + 'a')
  .map(value => value.length)
