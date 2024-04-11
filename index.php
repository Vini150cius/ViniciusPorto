<!DOCTYPE html>
<html lang="pt-br">

<head><?php include_once 'cabecalho.php' ?></head>


<body>
    <?php include_once 'navegacao.php' ?>
    <div class="conteudo">
        <?php
        $pagina = filter_input(INPUT_GET, 'p');
        if (empty($pagina)) {
            include_once 'home.php';
        } else {
            if (file_exists($pagina . '.php')) {
                include_once $pagina . '.php';
            } else {
                echo "<div class='error col-md-6 col-sm-12'> "
                    . "<h1>Erro 404</h1>"
                    . "</div>";
            }
        }
        ?>
    </div>
    <?php include_once 'script.php' ?>
</body>

</html>