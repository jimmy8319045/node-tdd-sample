import FacebookHelper from '../../../src/facebook/helper.js'
//import task1_initModel from '../../../src/database/task1';

describe.skip('facebook-helper', () => {
  let facebookHelper = null;
  //let models = null;

  before((done) => {
    let userId = "";
    let token = "";
    facebookHelper = new FacebookHelper({userId, token});
    console.log(facebookHelper);
    done();
  });

  /*beforeEach(async (done) => {
    try {
      models = await task1_initModel()
      done()
    } catch (e) {
      done(e)
    }
  });*/

  it("get friends list", async (done) => {
    try {
      let friends = await facebookHelper.getFriends();
      console.log("friends", friends);
      (friends != null).should.be.true;
      friends.should.be.Array;
      friends[0].should.have.keys("name", "id");
      /*let count = 0;
      for (count = 0 ; count < friends.length ; count++){
      let addUser = {name: friends[count].name, facebookId: friends[count].id}
      let result = {};
      result = await models.friends.create(addUser);
      result.toJSON().should.has.keys(
        'id',
        'name',
        'facebookId',
        //'email',
        'createdAt',
        'updatedAt'
      );
    }*/
      done();
    } catch (e) {
      done(e);
    }
  });

  it("publish post", async (done) => {
    try {
      let post = {
        message: 'test facebook post api'
      }
      let result = await facebookHelper.publishPost(post);
      console.log("result", result);
      done();
    } catch (e) {
      done(e);
    }
  });
});
