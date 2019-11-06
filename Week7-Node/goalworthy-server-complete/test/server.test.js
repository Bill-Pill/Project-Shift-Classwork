const chai = require("chai");
const chaiHTTP = require("chai-http");
const server = require("../app/server");
const expect = chai.expect;
const assert = chai.assert;

chai.use(chaiHTTP);
chai.use(require("chai-sorted"));

//GET GOALS
describe("/GET goals", () => {
  it.only("should GET all goals", done => {
    chai
      .request(server)
      .get("/v1/goals")
      .end((err, res) => {
        assert.isNotNull(res.body);
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect("Content-Type", "application/json");
        expect(res.body).to.be.an("array");
        expect(res.body).to.have.lengthOf(5);
        done();
      });
  });
  it.only("should limit results to those with a query string", done => {
    chai
      .request(server)
      .get("/v1/goals?query=Visit")
      .end((err, res) => {
        assert.isNotNull(res.body);
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect("Content-Type", "application/json");
        expect(res.body).to.be.an("array");
        expect(res.body).to.have.lengthOf(1);
        done();
      });
  });
  it.only("returns all goals if query is missing", done => {
    chai
      .request(server)
      //property doesn't exist
      .get("/v1/goals?query=")
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect("Content-Type", "application/json");
        expect(res.body).to.be.an("array");
        expect(res.body).to.have.lengthOf(5);
        done();
      });
  });
  it.only("should sort results when given a sort parameter", done => {
    chai
      .request(server)
      .get("/v1/goals?sort=upVotes")
      .end((err, res) => {
        assert.isNotNull(res.body);
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect("Content-Type", "application/json");
        expect(res.body).to.be.an("array");
        expect(res.body).to.have.lengthOf(5);
        expect(res.body).to.be.sortedBy("upVotes");
        done();
      });
  });
  it("fails as expected when unrecognized property", done => {
    chai
      .request(server)
      //property doesn't exist
      .get("/v1/goals?sort=sdfv")
      .end((err, res) => {
        expect(err).to.not.be.null;
        expect(res).to.have.status(404);
        done();
      });
  });
});


//GET CATEGORIES
describe("/GET categories", () => {
  it.only("should GET all categories", done => {
    chai
      .request(server)
      .get("/v1/categories")
      .end((err, res) => {
        assert.isNotNull(res.body);
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect("Content-Type", "application/json");
        expect(res.body).to.be.an("array");
        expect(res.body).to.have.lengthOf(3);
        done();
      });
  });
  it.only("should limit results to those with a query string", done => {
    chai
      .request(server)
      .get("/v1/categories?query=Exercise")
      .end((err, res) => {
        assert.isNotNull(res.body);
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect("Content-Type", "application/json");
        expect(res.body).to.be.an("array");
        expect(res.body).to.have.lengthOf(1);
        done();
      });
  });
});

//ACCEPT A GOAL
describe("/POST accept a goal", () => {
  it.only("should POST acceptance of specific goal", done => {
    chai
      .request(server)
      .post("/v1/me/goals/1/accept")
      .end((err, res) => {
        assert.isNotNull(res.body);
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect("Content-Type", "application/json");
        done();
      });
  });
  it.only("should not let you accept a goal that doesn't exist", done => {
    chai
      .request(server)
      .post("/v1/me/goals/12345/accept")
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
});

//ACHIEVE A GOAL
describe("/POST achieve a goal", () => {
  it.only("should POST achievement of specific goal", done => {
    chai
      .request(server)
      .post("/v1/me/goals/1/achieve")
      .end((err, res) => {
        assert.isNotNull(res.body);
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect("Content-Type", "application/json");
        done();
      });
  });
});

//GIFT A GOAL
describe("/POST gift a goal", () => {
  it.only("should POST gift of specific goal", done => {
    chai
      .request(server)
      .post("/v1/me/goals/1/gift/1")
      .end((err, res) => {
        assert.isNotNull(res.body);
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect("Content-Type", "application/json");
        done();
      });
  });
});

//CHALLENGE A GOAL
describe("/POST gift a goal", () => {
  it.only("should POST gift of specific goal", done => {
    chai
      .request(server)
      .post("/v1/me/goals/1/challenge/1")
      .end((err, res) => {
        assert.isNotNull(res.body);
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect("Content-Type", "application/json");
        done();
      });
  });
});
