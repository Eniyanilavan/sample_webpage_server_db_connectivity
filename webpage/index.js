function submit(){
    console.log("came");
    var email = document.getElementById("email").value;
    var pass = document.getElementById("pass").value;
    var body = {email:email,pass:pass}
    console.log(body);
    var request = new Request('http://localhost:5000/db',{
        method : "POST",
        headers : new Headers({"Content-Type":"application/json"}),
        body: JSON.stringify(body),
    })
    fetch(request)
    .then(function (res){
        res.json()
        .then((data)=>{
            console.log(data);
        })
    })
}