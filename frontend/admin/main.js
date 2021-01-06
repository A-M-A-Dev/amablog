const baseUrl = window.location.origin;
const getUserPostsUrl = baseUrl + "/api/admin/post";
const deletePostUrl = baseUrl + "/api/admin/post/";
const jwtToken = window.localStorage["Bearer Token"];

$(document).ready(function() {
    $.ajax({
        url: getUserPostsUrl,
        method: 'GET',
        headers: {
            "Authorization": jwtToken,
        },
        success: function (response) {
            if (response.length)
                createAndAppendPosts(response);
            else
                $("#no-post-alert").removeClass("d-none");
            
        },
        error: function (error) {
            console.log(error)
        }
    });
})

function createAndAppendPosts(posts) {
    $posts = createPostElements(posts);
    $("#posts-container").append($posts);
}

function createPostElements(posts) {
    postsElements = [];

    for (post of posts) {
        $post = $(".clonable-post").clone(true);
        $post.removeClass('d-none clonable-post');

        $post.find(".post-title").text(post.title);
        $post.find(".post-content").text(post.content);
        $post.find(".post-author").text(post.user.email);
        $post.find(".post-created-at").text(formatDate(post.createdAt));

        $post.find(".remove-post-container").attr("data-pid", post.id).on('click', function(e) {
            deletePostRequest($(this).data("pid"), $(this).closest(".post-container"));
        });

        postsElements.push($post)
    }
    
    return postsElements;
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

function deletePostRequest(id, $post) {
    $.ajax({
        url: deletePostUrl + id,
        method: "DELETE",
        headers: {
            "Authorization": jwtToken,
        },
        success: function (response) {
            $post.fadeOut(300, function() {
                $(this).remove();
            });
        },
        error: function (error) {
            console.log(error)
        }
    });
}