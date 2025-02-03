$(document).ready(function() {
  // Watch Later button click handler
  $(document).on('submit', '#MX_for_watcher', function(e) {
    e.preventDefault();
    
    // Show loader
    $(this).find('.MX_loader_lazty').removeClass('d-none');
    
    // Get form data
    var formData = {
      slider_image: $(this).find('input[name="slider_image"]').val(),
      slider_title: $(this).find('input[name="slider_title"]').val(),
      slider_description: $(this).find('input[name="slider_description"]').val(), 
      slider_link: $(this).find('input[name="slider_link"]').val(),
      slider_rating: $(this).find('input[name="slider_rating"]').val(),
      slider_rating_value: $(this).find('input[name="slider_rating_value"]').val(),
      slider_is_saved: $(this).find('input[name="slider_is_saved"]').val()
    };

    var $form = $(this);

    // Save to cookie after 2 second delay
    setTimeout(() => {
      // Hide loader
      $form.find('.MX_loader_lazty').addClass('d-none');
      
      try {
        // Get existing cookie data
        var existingData = document.cookie.match(/watchLater=([^;]*)/);
        var watchLaterData = [];
        
        if (existingData) {
          try {
            watchLaterData = JSON.parse(decodeURIComponent(existingData[1]));
          } catch(e) {
            watchLaterData = [];
          }
        }

        // Check if movie already exists
        var exists = watchLaterData.some(function(item) {
          return item.slider_title === formData.slider_title;
        });

        if (!exists) {
          // Add new movie data
          watchLaterData.push(formData);

          // Save updated data back to cookie
          var cookieValue = encodeURIComponent(JSON.stringify(watchLaterData));
          document.cookie = "watchLater=" + cookieValue + "; path=/; max-age=" + (30*24*60*60); // 30 days

          // Verify cookie was set
          if (document.cookie.indexOf("watchLater=") >= 0) {
            alert('Successfully added to Watch Later!');
          } else {
            alert('Error: Could not save to Watch Later. Please check your cookie settings.');
          }
        } else {
          alert('This movie is already in your Watch Later list!');
        }

      } catch(err) {
        console.error('Error saving to cookie:', err);
        alert('Error saving to Watch Later. Please try again.');
      }
    }, 2000);
  });
});
