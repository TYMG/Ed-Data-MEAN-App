import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * Subject Schema
 */
const SubjectSchema = new mongoose.Schema({
  SubjectID: Number,
  PlotsAndConsequences: {
    LocPlotState1: String,
    /*LocPlotCity1: String,
    LocPlotState2: String,
    LocPlotCity2: String,
    DateExposure: String,
    PlotTarget1: String,
    PlotTarget2: String,
    PlotTarget3: String,
    AttackPreparation: String,
    OpSecurity: String,
    ChangingTarget: String,
    AnticpFatalsTarg: String,
    InternetUsePlot: String,
    ExtentPlot: String,
    Violent: String,
    CriminalSeverity: String,
    CriminalCharges: String,
    IndictArrest: String,
    CurrentStatus: String*/
  }/*,
  GroupNature: {
    GroupMembership: String,
    TerroristGroupName1: String,
    TerroristGroupName2: String,
    TerroristGroupName3: String,
    ActivelyRecruited: String,
    Recruiter1: String,
    Recruiter2: String,
    Recruiter3: String,
    ActivelyConnect: String,
    GroupCompetition: String,
    RoleGroup: String,
    LengthGroup: String,
    Clique: String,
    CliqueRadicalize: String,
    CliqueConnect: String
  },
  Radicalization: { //Dude!!!
    InternetRadicalization: String,
    MediaRadicalization: String,
    RadicalizationIslamist: String,
    RadicalizationFarRight: String,
    RadicalizationFarLeft: String,
    RadicalizationSingleIssue: String,
    IdeologicalSubCategory1: String,
    IdeologicalSubCategory2: String,
    IdeologicalSubCategory3: String,
    LocHabitationState1: String,
    LocHabitationCity1: String,
    LocHabitationState2: String,
    LocHabitationCity2: String,
    Itinerant: String,
    ExternalRad: String,
    Radduration: String,
    RadicalBehaviors: String,
    RadicalBeliefs: String,
    USGovtLeader: String,
    ForeignGovtLeader: String,
    EventInfluence1: String,
    EventInfluence2: String,
    EventInfluence3: String,
    EventInfluence4: String,
    BeliefsTrajectory: String,
    BehaviorsTrajectory: String,
    RadicalizationSequence: String,
    RadicalizationPlace: String,
    PrisonRadicalize: String
  },
  Demographics: {
    BroadEthnicity: String,
    Age: String,
    MaritalStatus: String,
    Children: String,
    AgeChild: String,
    Gender: String,
    ReligiousBackground: String,
    Convert: String,
    ConvertDate: String,
    Reawakening: String,
    ReawakeningDate: String,
    Citizenship: String,
    ResidencyStatus: String,
    Nativity: String,
    TimeUSMonths: String,
    ImmigrantGeneration: String,
    ImmigrantSource: String,
    LanguageEnglish: String,
    DiasporaTies: String
  },
  SocioeconomicStatus: {
    Education: String,
    Student: String,
    EducationChange: String,
    EmploymentStatus: String,
    ChangePerformance: String,
    WorkHistory: String,
    Military: String,
    ForeignMilitary: String,
    SocialStratumChildhood: String,
    SocialStratumAdulthood: String,
    Aspirations: String
  },
  Personal: {
    AbuseChild: String,
    AbuseAdult: String,
    Abusetype1: String,
    AbuseType2: String,
    AbuseType3: String,
    Psychological: String,
    AlcoholDrug: String,
    AbsentParent: String,
    OverseasFamily: String,
    CloseFamily: String,
    FamilyReligiosity: String,
    FamilyIdeology: String,
    FamilyIdeologicalLevel: String,
    PrisonFamilyFriend: String,
    CrimeFamilyFriend: String,
    RadicalFriend: String,
    RadicalFamily: String,
    RadicalSignifOther: String,
    RelationshipTroubles: String,
    PlatonicTroubles: String,
    UnstructuredTime: String,
    FriendshipSource1: String,
    FriendshipSource2: String,
    FriendshipSource3: String,
    KickedOut: String,
    PreviousCriminalActivity: String,
    Gang: String,
    GangIdeology: String,
    GangAgeJoined: String,
    GangRadicalize: String,
    Trauma: String,
    OtherIdeologies: String,
    AngryUS: String,
    GroupGrievance: String,
    Standing: String
  }*/
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
SubjectSchema.method({
});

/**
 * Statics
 */
SubjectSchema.statics = {
  /**
   * Get subject
   * @param {ObjectId} id - The objectId of subject.
   * @returns {Promise<Subject, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((subject) => {
        if (subject) {
          return subject;
        }
        const err = new APIError('No such subject exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },
  /**
   * List subjects in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of subjects to be skipped.
   * @param {number} limit - Limit number of subjects to be returned.
   * @returns {Promise<Subject[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  }
};

/**
 * @typedef Subject
 */
export default mongoose.model('Subject', SubjectSchema);
