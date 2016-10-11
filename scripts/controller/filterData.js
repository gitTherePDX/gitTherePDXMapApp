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
      console.log($(this).attr('value'));
      
      filterData[($(this).attr('value'))] = true;
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
