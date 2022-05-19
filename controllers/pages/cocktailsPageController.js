const CocktailsPage = require('./../../models/pages/cocktailsPageModel');
const factory = require('./../handlerFactory');

exports.getAllCocktailsPages = factory.getAll(CocktailsPage);

exports.getCocktailsPage = factory.getOne(CocktailsPage);

exports.createCocktailsPage = factory.createOne(CocktailsPage);

exports.updateCocktailsPage = factory.updateOne(CocktailsPage);

exports.deleteCocktailsPage = factory.deleteOne(CocktailsPage);
