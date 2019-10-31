let Book = require('../app/models/book');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');

let should = chai.should();

chai.use(chaiHttp);

beforeEach(() => {
  Book.removeAll();
});
describe('Books', () => {
  describe('/GET book', () => {
    it('it should GET all the books', done => {
      chai
        .request(server)
        .get('/book')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });
});

describe('/POST book', () => {
  // POSITIVE test
  it('it should POST a book ', done => {
    // arrange
    let book = {
      title: 'The Hunger Games',
      author: 'Suzanne Collins',
      year: 2008,
      pages: 301
    };
  //act
    chai
      .request(server)
      .post('/book')
      .send(book)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('title');
        res.body.should.have.property('author');
        res.body.should.have.property('pages');
        res.body.should.have.property('year');
        done();
      });
  });
  // NEGATIVE test
  // it('it should not POST a book with missing "pages" field', done => {
  //   // arrange
  //   let book = {
  //     title: 'The Harry Potter',
  //     author: 'Suzanne Collins',
  //     year: 2008
  //   }
  //   // act
  //   chai
  //     .request(server)
  //     .post('/book')
  //     .send(book)
  //     .end((err, res) => {
  //       res.should.have.status(400);
  //       res.body.should.be.a('object');
  //       res.body.should.have.property('title');
  //       res.body.should.have.property('author');
  //       expect(res.body).to.not.have.property('pages')
  //       res.body.should.have.property('year');
  //       done();
  //     });
  // })
});