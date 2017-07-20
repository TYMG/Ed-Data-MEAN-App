import State from '../models/state.model';


function load(params) {
  return State.get(params.id);
}

function get(req, res) {
 State.getByStateCode(req.params.stateCode)
    .then(states => res.json(states))
    .catch(e => next(e));  
}

function create(params) {
  const state = new State({
    stateCode: params.data.stateCode,
    population: params.data.population,
    autoLoanDebt: params.data.autoLoanDebt,
    creditCardDebt: params.data.creditCardDebt,
    mortagageDebt: params.data.mortagageDebt,
    studentLoanDebt: params.data.studentLoanDebt,
    totalDebt: params.data.totalDebt,
    autoLoanDelinq: params.data.autoLoanDelinq,
    creditCardDelinq: params.data.creditCardDelinq,
    mortagageDelinq: params.data.mortagageDelinq,
    studentLoanDelinq: params.data.studentLoanDelinq
  });
  return state.save();
}

function update(params) {
  return load(params).then(state => {
    const tmp = state;
    state.stateCode =  params.data.stateCode,
    state.population =  params.data.population,
    state.autoLoanDebt =  params.data.autoLoanDebt,
    state.creditCardDebt =  params.data.creditCardDebt,
    state.mortagageDebt =  params.data.mortagageDebt,
    state.studentLoanDebt =  params.data.studentLoanDebt,
    state.totalDebt =  params.data.totalDebt,
    state.autoLoanDelinq =  params.data.autoLoanDelinq,
    state.creditCardDelinq =  params.data.creditCardDelinq,
    state.mortagageDelinq =  params.data.mortagageDelinq,
    state.studentLoanDelinq =  params.data.studentLoanDelinq
    return state.save()
  });
}

function list(req, res, next) {
  State.list()
    .then(states => res.json(states))
    .catch(e => next(e));
}

function remove(params) {
  return load(params).then(state => state.remove());
}

export default { load, get, create, update, list, remove };
