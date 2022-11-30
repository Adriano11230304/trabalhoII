async function search(){
    const search = document.querySelector('#search').value;
    const container = document.querySelector('#container');
    const page = document.querySelector('#page');
    page.innerHTML = '';
    const posts = await (await fetch('/posts/search/' + search)).json();

    if(posts.length > 0){
        let html = '';
        for(let i = 0; i < posts.length; i++) {
            html += "<hr class='border border-dark border-2 opacity-50'></hr>";
            html += "<h6 class='m-2'>";
            html += posts[i].createdAt;
            html += "</h6>";
            html += "<hr class='border border-dark border-2 opacity-50'></hr>";
            html += "<div class='flex-container m-2'>";
            html += "<h3>";
            html += posts[i].title;
            html += "</h3>";
            html += "</div>";
            html += "<div class='flex-container m-2'>";
            html += "<a class='btn btn-outline-dark m-2' href='/posts/update/<%=posts[i].id%>'>";
            html += "<img src='/img/editar.png' title='Alterar Post' width='25' height='25'>";
            html += "</a>";
            html += "<a class='btn btn-outline-dark m-2' href='/posts/delete/<%=posts[i].id%>'>";
            html += "<img src='/img/excluir.png' title='Excluir Post' width='25' height='25'>";
            html += "</a>";
            html += "<a class='btn btn-outline-dark m-2' href='/posts/details/<%=posts[i].id%>'>";
            html += "<img src='/img/visualizar.png' title='Visualizar Post' width='25' height='25'>";
            html += "</a>";
            html += "<a class='btn btn-outline-dark m-2' href='/posts/details/<%=posts[i].id%>'>";
            html += "<img src='/img/like1.png' title='Curtir Post' width='25' height='25'>";
            html += "</a>";
            html += "<a class='btn btn-outline-dark m-2' href='#'>";
            html += "<img src='/img/comentarios.png' title='Comentar Post' width='25' height='25'>";
            html += "</a>";
            html += "</div>";
            html += "<div class='flex-container m-2'>";
            html += "<p class='text-justify'>";
            html += posts[i].description;
            html += "</p>";
            html += "</div>";
            html += "<div class='text-center'>";
            if(posts[i].imageURL){
                let url = '';
                url = posts[i].imageURL;
                html += "<img src='"+url+"'alt='Imagem do Post' width='350' height='250'>";
            }
            html += "</div>";
        }
        container.innerHTML = html;
    }else{
        container.innerHTML = "<h3 class='m-4'>Nenhum Post encontrado!</h3>"
    }
    
}