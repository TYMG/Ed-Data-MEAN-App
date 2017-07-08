import Subject from '../models/subject.model';


function load(params) {
  return Subject.get(params.id);
}

function get(req, res) {
  return res.json(req.subject);
}

function create(params) {
  const subject = new Subject({
    SubjectId: params.data.SubjectId,
    PlotsAndConsequences:{
      LocPlotState1: params.data.PlotsAndConsequences.LocPlotState1
    } 
  });
  return subject.save();
}

function update(params) {
  return load(params).then(subject => {
    const tmp = subject;
    subject.SubjectId = params.data.SubjectId;
    subject.PlotsAndConsequences.LocPlotState1 = params.data.PlotsAndConsequences.LocPlotState1;
    return subject.save()
  });
}

function list(params) {
  const { limit = 50, skip = 0 } = params;
  return Subject.list({ limit, skip })
}

function remove(params) {
  return load(params).then(subject => subject.remove());
}

export default { load, get, create, update, list, remove };
