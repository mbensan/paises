$(document).ready(function () {

  $(".btnEliminar").on("click", function () {
    let boton = $(this);
    let idPais = boton.attr("pais");

    // ¿estas seguro que quieres eliminar el pais?
    // si y no.
    bootbox.confirm({
      message: "¿estas seguro que quieres eliminar el pais?",
      buttons: {
        confirm: {
          label: 'Si',
          className: 'btn-success'
        },
        cancel: {
          label: 'No',
          className: 'btn-danger'
        }
      },
      callback: function (result) {

        if (result) {
          console.log("EL USUARIO QUIERE ELIMINAR");
          console.log("RUTA PARA ELIMINAR: " + "/eliminar/" + idPais);

          $.get("/eliminar/" + idPais, function (res) {
            console.log(res);

            // eliminar el LI. 
            boton.parent().remove();

            bootbox.alert(res.mensaje);
          }, "json");


        } else {
          console.log("EL USUARIO SE ARREPINTIÓ!");
        }

      }
    });
  });
});