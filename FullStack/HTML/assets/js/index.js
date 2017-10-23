/*ลบ*/
function deletepost(id){
    alert('ต้องการลบ ประสบการณ์ครั้งนี้ จริงๆหรือ ? ');

    //Delete from back end
    $.ajax({
        url: "http://localhost:3000/posts/" + id, // post id
        type: "DELETE" // Use DELETE
    })
    alert('โอเคๆ ! ลบให้ล่ะ');
    setTimeout(window.location.href = "index2.html");
    //Delete from front end
    $("#post"+id).empty();

}

/*แก้ไขโพสเพื่อเปิดจาก อ่านเท่านั่นเป็นแก้ไขได้*/
function editpost(id,review,postby,zone,picture) {
    console.log(id);
    var url = "http://localhost:3000/posts";
    $("#review" + id).prop('readonly', false);
    $("#postby" + id).prop('readonly', false);
    $("#zone" + id).prop('readonly', false);
    $("#picture" + id).prop('readonly', false);


    $.ajax({
        type: 'PUT',
        //data: {name: 'Billy Bob', age: 28},
        url: url + "/" + id,
        success: function () {
            //no data...just a success (200) status code
            console.log(id);
        }
    });
  }

/*แก้ไข้*/
function savepost(id,comment) {
    // console.log(id,title)
    var review = review;
      var picture = picture;
        var zone = zone;
          var postby = postby;
     var newposts = {};

     newposts.id = id;
     newposts.review = $("#review"+id).val();
     newposts.picture = $("#picture"+id).val();
     newposts.zone = $("#zone"+id).val();
     newposts.postby = $("#postby"+id).val();

     var url = "http://localhost:3000/posts/"+id;
     $.ajax({
         type: 'PUT',
         data: newposts,
         url: url,
         success: function () {
             //no data...just a success (200) status code
             console.log(newposts);
         }
     });
 }


$(document).ready(function () {
  var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
  var firstDate = new Date(2008,01,12);
  var secondDate = new Date(2008,02,12);
  var $postby  = $ ('#postby');
  var $review = $ ('#review');
  var $zone  = $ ('#zone');
  var $picture = $ ('#picture');

/*console.log($("#postby").val());*/
  var url = "http://localhost:3000/posts"
/*อ่าน้*/
  $("#btnG").click(function () {
    $.ajax({
      url: url,
      method: "GET",
      success: function (data, status, xhr) {
        console.log(data);
        var template = $('#template').html();
        for(var i=0;i<data.length;i++){
        var rendered = Mustache.render(template, data[i]);
            $("#posts").append(rendered);
          }
        }
    })
  });



  //create
  $("#btnC").click(function () {
    console.log($("#postby").val());
    $.post(url, {
      postby: $("#postby").val(),
      review:$("#review").val(),
      comment:"โปรดติชมหรือแสดงความคิดเห็น",
      zone: $("#zone").val(),
      picture : $("#picture").val(),
    });
    alert('อัพเดตให้แล้วนะ ! ไว้เข้ามาใหม่ล่ะ');
      setTimeout(window.location.href = "index2.html");


  });
  /*
  //update have error
  $("#btnU").click(function () {
    $.get(url + "/3", function (data, status) {
      console.log(data);
      var newuser = {};
      newuser.id = data.id;
      newuser.title = "zzzzzzzzzzzzzzz";
      console.log(JSON.stringify(newuser));
      var updateUrl = url + "/3";
      $.ajax({
        url: updateUrl,
        type: 'PUT',
        data: newuser,
        success: function (result) {
          console.log('Updated!');
        }
      });
    });
  });
  */
});
