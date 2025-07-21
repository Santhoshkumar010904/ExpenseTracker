const sel=document.getElementById("select");
const inco=document.getElementById("inc");
const expen=document.getElementById("exp");
inco.style.display="none";
expen.style.display="none";
sel.addEventListener("change", function()
{
    if(this.value==="income")
    {
        inco.style.display="block";
        expen.style.display="none";
    }
    else if(this.value==="expense")
    {
        inco.style.display="none";
        expen.style.display="block";
    }
    else{
        inco.style.display="none";
        expen.style.display="none";
    }

})