$("#news").on("", async (event) => {
    event.preventDefault();
    const renderNews = await axios({
        method: 'get',
        url: '/api/news/',
    });    
    console.log(renderNews);
});