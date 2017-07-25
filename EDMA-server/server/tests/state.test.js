import mongoose from 'mongoose';
import request from 'supertest-as-promised';
import httpStatus from 'http-status';
import chai, { expect } from 'chai';
import app from '../../index';

chai.config.includeStack = true;

/**
 * root level hooks
 */
after((done) => {
  // required because https://github.com/Automattic/mongoose/issues/1251#issuecomment-65793092
  mongoose.models = {};
  mongoose.modelSchemas = {};
  mongoose.connection.close();
  done();
});

describe('## State APIs', () => {
  let testState = {
    stateCode: 'ZZ',
    population: [445500, 467440, 487120, 486320, 478640, 492740, 497340, 502840, 499840, 497080,
      503360, 510780, 511740, 512700, 544100, 548900, 552420, 554580],
    autoLongDebt: [2000, 2230, 2940, 3310, 3480, 3390, 3590, 3620, 3800, 3780, 3620, 3680, 3790,
      4140, 4270, 4690, 4990, 5070
    ],
    creditCardDebt: [2900, 3320, 3540, 3940, 4260, 4430, 4440, 4510, 4850, 4810, 4540, 4180,
      4060, 3980, 3820, 3830, 3920, 4110
    ],
    mortgageDebt: [19330, 20110, 21150, 21060, 26080, 28580, 30400, 33210, 37470, 39940, 39320,
      39210, 34020, 39860, 39440, 39170, 40470, 40940
    ],
    studentLoanDebt: [450, 520, 600, 580, 680, 1730, 1910, 2250, 2340, 2530, 2850, 3140, 3390,
      3680, 3630, 3640, 3610, 3660,
    ],
    totalDebt: [27480, 28740, 29930, 30820, 36420, 40530, 43290, 46450, 51490, 54110, 53140,
      52730, 48440, 54740, 54000, 54330, 56050, 57040
    ],
    autoLoanDelinq: [0.9499999881, 1.120000005, 0.7699999809, 0.7699999809, 0.8299999833,
      1.039999962, 1.059999943, 0.9100000262, 1.169999957, 1.279999971, 1.700000048, 2.180000067,
      1.99000001, 1.879999995, 1.690000057, 1.779999971, 1.700000048, 2.089999914
    ],
    creditCardDelinq: [3.539999962, 3.339999914, 4.730000019, 5.090000153, 5.210000038,
      5.679999828, 5.199999809, 6.610000134, 6.400000095, 5.579999924, 7.010000229, 7.610000134,
      5.650000095, 5.21999979, 5, 3.980000019, 5.360000134, 5.010000229
    ],
    mortgageDelinq: [0.6700000167, 0.4300000072, 0.6399999857, 0.5, 0.5699999928, 0.5299999714,
      0.6100000143, 0.8100000024, 1.320000052, 1.960000038, 2.980000019, 2.519999981, 2.420000076,
      1.99000001, 1.370000005, 0.9200000167, 0.8500000238, 0.9300000072
    ],
    studentLoanDelinq: [10.39999962, 11.22000027, 15.88000011, 8.760000229, 5.5, 10.02000046,
      8.720000267, 10.72000027, 9.300000191, 8.069999695, 8.340000153, 9.609999657, 9.960000038,
      10.06000042, 9.960000038, 10.72999954, 10.21000004, 11.02000046
    ]
  };

  describe('# POST /api/states', () => {
    it('should create a new state', (done) => {
      request(app)
        .post('/api/states')
        .send(testState)
  .set('Content-Type', 'application/json')
        .expect('Content-Type', /json/)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.stateCode).to.equal(testState.stateCode);
          expect(res.body.autoLongDebt).to.equal(testState.autoLongDebt);
          expect(res.body.creditCardDebt).to.equal(testState.creditCardDebt);
          expect(res.body.studentLoanDebt).to.equal(testState.studentLoanDebt);
          expect(res.body.totalDebt).to.equal(testState.totalDebt);
          expect(res.body.autoLoanDelinq).to.equal(testState.autoLoanDelinq);
          expect(res.body.creditCardDelinq).to.equal(testState.creditCardDelinq);
          expect(res.body.mortgageDelinq).to.equal(testState.mortgageDelinq);
          expect(res.body.studentLoanDelinq).to.equal(testState.studentLoanDelinq);
          testState = res.body;
          done();
        })
        .catch(done)
        .end((err) => {
          if (err) done(err);
          done();
        });
    });
  });

  describe('# GET /api/states/:stateCode', () => {
    it('should get state details', (done) => {
      request(app)
        .get(`/api/states/${testState.stateCode}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.stateCode).to.equal(testState.stateCode);
          expect(res.body.autoLongDebt).to.equal(testState.autoLongDebt);
          expect(res.body.creditCardDebt).to.equal(testState.creditCardDebt);
          expect(res.body.studentLoanDebt).to.equal(testState.studentLoanDebt);
          expect(res.body.totalDebt).to.equal(testState.totalDebt);
          expect(res.body.autoLoanDelinq).to.equal(testState.autoLoanDelinq);
          expect(res.body.creditCardDelinq).to.equal(testState.creditCardDelinq);
          expect(res.body.mortgageDelinq).to.equal(testState.mortgageDelinq);
          expect(res.body.studentLoanDelinq).to.equal(testState.studentLoanDelinq);
          done();
        })
        .catch(done);
    });

    it('should report error with message - Not found, when user does not exists', (done) => {
      request(app)
        .get('/api/states/XX')
        .expect(httpStatus.NOT_FOUND)
        .then((res) => {
          expect(res.body.message).to.equal('Not Found');
          done();
        })
        .catch(done);
    });
  });

  describe('# PUT /api/states/:stateCode', () => {
    it('should update state details', (done) => {
      testState.stateCode = 'KK';
      request(app)
        .put(`/api/states/${testState.stateCode}`)
        .send(testState)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.stateCode).to.equal('KK');
          expect(res.body.autoLongDebt).to.equal(testState.autoLongDebt);
          expect(res.body.creditCardDebt).to.equal(testState.creditCardDebt);
          expect(res.body.studentLoanDebt).to.equal(testState.studentLoanDebt);
          expect(res.body.totalDebt).to.equal(testState.totalDebt);
          expect(res.body.autoLoanDelinq).to.equal(testState.autoLoanDelinq);
          expect(res.body.creditCardDelinq).to.equal(testState.creditCardDelinq);
          expect(res.body.mortgageDelinq).to.equal(testState.mortgageDelinq);
          expect(res.body.studentLoanDelinq).to.equal(testState.studentLoanDelinq);
          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/states/', () => {
    it('should get all users', (done) => {
      request(app)
        .get('/api/states')
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('array');
          done();
        })
        .catch(done);
    });
  });

  describe('# DELETE /api/states/', () => {
    it('should delete state', (done) => {
      request(app)
        .delete(`/api/states/${testState.stateCode}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.stateCode).to.equal(testState.stateCode);
          expect(res.body.autoLongDebt).to.equal(testState.autoLongDebt);
          expect(res.body.creditCardDebt).to.equal(testState.creditCardDebt);
          expect(res.body.studentLoanDebt).to.equal(testState.studentLoanDebt);
          expect(res.body.totalDebt).to.equal(testState.totalDebt);
          expect(res.body.autoLoanDelinq).to.equal(testState.autoLoanDelinq);
          expect(res.body.creditCardDelinq).to.equal(testState.creditCardDelinq);
          expect(res.body.mortgageDelinq).to.equal(testState.mortgageDelinq);
          expect(res.body.studentLoanDelinq).to.equal(testState.studentLoanDelinq);
          done();
        })
        .catch(done);
    });
  });
});
