var u = 'http://127.0.0.1:9000/';
var sh = [];
$("script[src]")
  .each(function (o, v) {
    var s = v.src;
    if (s.indexOf(u) == 0) {
      console.log('\'public/' + s.substring(u.length) + '\',');
      // sh.push('public/' + s.substring(u.length));
    }
    //console.log(o.attr('src'));
  });