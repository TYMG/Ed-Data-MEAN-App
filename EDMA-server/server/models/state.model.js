import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * State Schema
 */
const StateSchema = new mongoose.Schema({
  stateCode: String,
  population: [Number],
  autoLoanDebt: [Number],
  creditCardDebt: [Number],
  mortagageDebt: [Number],
  studentLoanDebt: [Number],
  totalDebt: [Number],
  autoLoanDelinq: [Number],
  creditCardDelinq: [Number],
  mortagageDelinq: [Number],
  studentLoanDelinq: [Number]
},
  { collection: 'State' });

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
StateSchema.method({
});

/**
 * Statics
 */
StateSchema.statics = {
  /**
   * Get state
   * @param {ObjectId} id - The objectId of state.
   * @returns {Promise<State, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((state) => {
        if (state) {
          return state;
        }
        const err = new APIError('No such state exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },
    /**
   * Get state by the stateCode
   * @param {String} stateCodeParam - The objectId of state.
   * @returns {Promise<State, APIError>}
   */
  getByStateCode(stateCodeParam) {
    return this.findOne({ stateCode: stateCodeParam })
      .exec()
      .then((state) => {
        if (state) {
          return state;
        }
        const err = new APIError('No such state exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },
  /**
   * List states in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of states to be skipped.
   * @param {number} limit - Limit number of states to be returned.
   * @returns {Promise<State[]>}
   */
  list() {
    return this.find()
      .exec()
      .then((state) => {
        if (state) {
          return state;
        }
        const err = new APIError('No States!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  }
};

/**
 * @typedef State
 */
export default mongoose.model('State', StateSchema);
