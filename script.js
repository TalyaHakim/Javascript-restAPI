fetch('https://github-jobs-proxy.appspot.com/positions?description=developer&location=usa').then(res =>{
    res.json().then(data=>{
         data.forEach(ele =>{
            BuildHTML(ele);
        }
        )
    })
})

//--On HTML-----------------------------------------------------------------------------------------------------------

function BuildHTML(ele){
    const divcardJob = document.createElement('div')
            divcardJob.className = 'cardJob'
            divcardJob.id = `${ele.id}`
            const pTag1 = document.createElement('p')
            pTag1.innerHTML = `${ele.created_at}`
            const h1Tag = document.createElement('h1')
            h1Tag.innerHTML = `${ele.title}`
            const pTag2 = document.createElement('p')
            pTag2.innerHTML = `Company : ${ele.company}`
            const DescriptionDiv = document.createElement('div')
            DescriptionDiv.className = 'DescriptionDiv'
            DescriptionDiv.style.display = 'none'
            const pTag3 = document.createElement('p')
            pTag3.innerHTML = `Type : ${ele.type}`
            const pTag4 = document.createElement('p')
            pTag4.innerHTML = `Location : ${ele.location}`
            const pTag5 = document.createElement('p')
            pTag5.innerHTML = `Description : ${ele.description}`
            const btnUrl = document.createElement('a');
            btnUrl.textContent = `Apply`
            btnUrl.className = 'btnUrl'
            btnUrl.setAttribute('href', `${ele.url}`);
            
            
            divcardJob.appendChild(pTag1)
            divcardJob.appendChild(h1Tag)
            divcardJob.appendChild(pTag2)
            DescriptionDiv.appendChild(pTag3)
            DescriptionDiv.appendChild(pTag4)
            DescriptionDiv.appendChild(pTag5)
            DescriptionDiv.appendChild(btnUrl)
            divcardJob.appendChild(DescriptionDiv)

            document.getElementById('jobsHere').appendChild(divcardJob)

            divcardJob.addEventListener('click', ()=> {
                DescriptionDiv.style.display = 'block';

            });
}

//--Filtering by Search---------------------------------------------------------------------------------------------------------

async function searchResults(){
    const description = document.getElementById('description').value;
    const location = document.getElementById('location').value;
    const res = await fetch(`https://github-jobs-proxy.appspot.com/positions?description=${description}&location=${location}`);
    const data = await res.json();
    console.log(data)
    document.getElementById('jobsHere').innerHTML = ''
    data.forEach(ele => {
    BuildHTML(ele);
    })
}

//--Filtering by Category----------------------------------------------------------------------------------------------------

async function Category(id){
    const res = await fetch(`https://github-jobs-proxy.appspot.com/positions?description=${id}&location=`);
    const data = await res.json();
    console.log(data)
    document.getElementById('jobsHere').innerHTML = ''
    data.forEach(ele => {
        BuildHTML(ele);
    });
}
