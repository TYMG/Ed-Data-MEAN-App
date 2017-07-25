import State from '../models/state.model';


function load(req) {
  return State.get(req.stateCode);
}

function get(req, res) {
  State.getByStateCode(req.stateCode)
    .then(states => res.json(states))
    .catch(e => (e));
}

function create(req, res) {
  const state = new State({
    stateCode: req.body.data.stateCode,
    population: req.body.data.population,
    autoLoanDebt: req.body.data.autoLoanDebt,
    creditCardDebt: req.body.data.creditCardDebt,
    mortagageDebt: req.body.data.mortagageDebt,
    studentLoanDebt: req.body.data.studentLoanDebt,
    totalDebt: req.body.data.totalDebt,
    autoLoanDelinq: req.body.data.autoLoanDelinq,
    creditCardDelinq: req.body.data.creditCardDelinq,
    mortagageDelinq: req.body.data.mortagageDelinq,
    studentLoanDelinq: req.body.data.studentLoanDelinq
  });
  State.create(state,
    (err) => {
      if (err) {
        return err;
      }
      return undefined;
    }
  ).then((savedState) => {
    res.json(savedState);
  }).catch((err) => {
    res.json(err);
  });
  /* .then(savedState =>
    {
      res.json(savedState);
    })
  .catch(e => (console.log())); */
}

function update(req, res, next) {
  return load(req, res, next).then((state) => {
    const updatedState = state;
    updatedState.stateCode = req.body.data.stateCode;
    updatedState.population = req.body.data.population;
    updatedState.autoLoanDebt = req.body.data.autoLoanDebt;
    updatedState.creditCardDebt = req.body.data.creditCardDebt;
    updatedState.mortagageDebt = req.body.data.mortagageDebt;
    updatedState.studentLoanDebt = req.body.data.studentLoanDebt;
    updatedState.totalDebt = req.body.data.totalDebt;
    updatedState.autoLoanDelinq = req.body.data.autoLoanDelinq;
    updatedState.creditCardDelinq = req.body.data.creditCardDelinq;
    updatedState.mortagageDelinq = req.body.data.mortagageDelinq;
    updatedState.studentLoanDelinq = req.body.data.studentLoanDelinq;
    return updatedState.save();
  });
}

function list(req, res, next) {
  State.list()
    .then(states => res.json(states))
    .catch(e => next(e));
}

function remove(req, res, next) {
  return load(req, res, next)
    .then(
    state => state.remove()
      .then(removedState => res.json(removedState))
      .catch(e => next(e))
    );
}

export default { load, get, create, update, list, remove };
