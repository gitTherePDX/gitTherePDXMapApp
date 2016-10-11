var filterData = {
  address: '',
  Biketown: false,
  Lyft: false,
  Uber: false

};

filterData.getTransportationOption = function() {
  $('form').on('submit', function(event){
    event.preventDefault();
    $(this).find('input[type="checkbox"]:checked').each(function() {
      console.log($(this).attr('value'), 'checked');
      filterData[$(this).attr('value')] = true;
    });
    $(this).find('input[type="checkbox"]:not(:checked)').each(function(){
      console.log($(this).attr('value'), 'not checked');
      filterData[$(this).attr('value')] = false;
    });
  });
};

filterData.getAddress = function() {
  $('form').submit(function(event){
    event.preventDefault();
    console.log($('#address').val());
    filterData.address = $('#address').val();
  });
};
filterData.getAddress();
filterData.getTransportationOption();
