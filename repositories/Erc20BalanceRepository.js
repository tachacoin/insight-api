const async = require('async');
const Erc20Balance = require('../models/Erc20Balance');

function Erc20BalanceRepository () {}


Erc20BalanceRepository.prototype.findBalanceByEthAddress = function (addressEth, next) {
    return Erc20Balance.findOne({address_eth: addressEth}, function(err, row) {
        return next(err, row);
    });
};


Erc20BalanceRepository.prototype.createOrUpdateBalance = function (data, next) {
    return Erc20Balance.findOneAndUpdate({contract_address: data.contract_address, address_eth: data.address_eth}, data, {upsert: true, new: true}, function(err, row) {
        return next(err, row);
    });

};

Erc20BalanceRepository.prototype.removeBalance = function (data, next) {
    return Erc20Balance.remove({contract_address: data.contract_address, address_eth: data.address_eth}, function(err, row) {
        return next(err, row);
    });
};


Erc20BalanceRepository.prototype.getCountBalances = function (contractAddress, next) {
    return Erc20Balance.count({contract_address: contractAddress}, function(err, count) {
        return next(err, count);
    });
};

/**
 *
 * @param {String} contractAddress
 * @param {Object} options
 * @param {Number} options.limit
 * @param {Number} options.offset
 * @param {Function} next
 */
Erc20BalanceRepository.prototype.fetchBalances = function (contractAddress, options, next) {
    return Erc20Balance.find({contract_address: contractAddress}, {}, {sort: {created_at: -1}, limit: options.limit, skip: options.offset}, function(err, balances) {
        return next(err, balances);
    });
};

module.exports = Erc20BalanceRepository;