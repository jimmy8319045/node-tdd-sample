import FacebookHelper from '../../../src/facebook/helper.js'
import task1_initModel from '../../../src/database/task1';

describe.only('facebook', () => {
  let facebookHelper = null;
  let models = null;
  let friends = null;
  let user = {};

 before( async function(done){
    let userId = "742593049095212";
    let token = "EAACEdEose0cBAAbNDJvMg9CvbInmC6PcXyhTIU8YSVNN3uSVrtqDyUQ27R8ey0XdFAz3FCBchzxXhOm2JxFizdzxz8XHVcpDwFZBqLtVOZBz8stZAMZCJxjfhxiP5Di7ilsADhXJtwBTMZAj1DuvF1NIeilRfWTcNrJvdyx4xsYQIcFhuJOWsrGX3BnjlFZC0ZD";
    models = await task1_initModel();
    facebookHelper = new FacebookHelper({userId, token});
    //console.log(facebookHelper);
    done();
  });
  describe('facebook friend', () => {
    it("get friends list", async (done) => {
      try {
        friends = await facebookHelper.getFriends();
        console.log("friends", friends);
        (friends != null).should.be.true;
        friends.should.be.Array;
        friends[0].should.have.keys("name", "id");
        done();
      } catch (e) {
        done(e);
      }
    });
    it("save to datebase", async (done) => {
      try {
        let count = 0;
        for (count = 0 ; count < friends.length ; count++){
          let addUser = {name: friends[count].name, facebookId: friends[count].id}
          user = await models.friends.create(addUser);
          user.toJSON().should.has.keys(
            'id',
            'name',
            'facebookId',
            //'email',
            'createdAt',
            'updatedAt'
          );
        }
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  describe('datebase', () => {
     it('get friend', async (done) => {
       try{
         let result = await models.friends.findAll();
         result.length.should.be.equal(friends.length);
         done();
       }
       catch(e){
         done(e);
       }
     });
     it('change email to hellojs@trunk.studio', async (done) => {
       try{
         let friend_1 = friends[0].id;
         let f1_data = await models.friends.findOne({
           where: {
              facebookId: friend_1
            }
          });
         f1_data.email = 'hellojs@trunk.studio';
         let result = await f1_data.save();
         console.log(result.name , result.id , result.email);
         result.email.should.equal('hellojs@trunk.studio');
         done();
      }
      catch(e){
        done(e);
      }
    });
    it('delete friend email is hellojs@trunk.studio', async (done) => {
      try{
        let del_friend = await models.friends.findOne({
          where:{email:'hellojs@trunk.studio'}
        });
        await del_friend.destroy();
        let result = await models.friends.findOne({
          where:{email:'hellojs@turnk.studio'}
        });
        (result === null ).should.be.true;
        done();
      }
      catch(e){
        done(e);
      }
    });
  });
});
