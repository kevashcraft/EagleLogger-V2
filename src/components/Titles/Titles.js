import TitlesModel from './TitlesModel'

exports.list = (req) => {
  return TitlesModel.list()
}
