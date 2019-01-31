<?php session_start();
    try {
        $db = new PDO('mysql:host=localhost;dbname=rds', "root", "");
    } catch (PDOException $e) {
        $dbMessage = $e->getMessage();
        die();
    }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>

<div class="container">

<?php if($db) : 
    $query = $db->prepare("SELECT * FROM admin");
    $query->execute();
    $query = $query->fetchAll();
    
    if (isset($_POST['username']) && isset($_POST['password'])){
        $userInput = trim(htmlspecialchars($_POST['username']));
        $passwordInput = trim(htmlspecialchars($_POST['password']));
        $passwordInput = password_hash($passwordInput, PASSWORD_DEFAULT);

        if ($userInput == $query['username'] && password_verify($passwordInput, $query['password'])) {
            echo 'Le mot de passe est valide !';
        } else {
            echo 'Le mot de passe est invalide.';
        }
    }
    
?>

    <?php if (!isset($_SESSION['user']) && !isset($_SESSION['pass'])) : ?>
        <div class="row">
            <div class="col-md-8 mx-auto">
                <div class="card rounded-0">
                    <div class="card-header">
                        <h3 class="mb-0">Login</h3>
                    </div>
                    <div class="card-body">
                        <form class="form" role="form" id="login" method="POST" action="<?php echo $_SERVER['PHP_SELF']; ?>">
                            <div class="form-group">
                                <label for="username">Nom d'utilisateur</label>
                                <input type="text" class="form-control form-control-lg rounded-0" name="username" id="username" required>

                            </div>
                            <div class="form-group">
                                <label>Mot de passe</label>
                                <input type="password" class="form-control form-control-lg rounded-0" name="password" id="password" required>
                            </div>
                            <button type="submit" class="btn btn-success btn-lg float-right" id="btnLogin">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    <?php else : ?>

        <p>Loggé</p>

    <?php endif; ?>

<?php else : echo $dbMessage; ?>

<?php endif; ?>

</div> <!-- /container (main) -->
</body>
</html>