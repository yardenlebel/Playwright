  function filterRecipesWithSoup(urls) {
    const regex = /soup/; 

    urls.forEach(url => {
        if (regex.test(url)) {
            console.log(url);
        }
    });
}

module.exports = filterRecipesWithSoup;