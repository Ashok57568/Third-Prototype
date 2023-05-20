<?php
    // Set database connection credentials
    error_reporting(E_ERROR | E_PARSE);

    $servername = "sql306.epizy.com";
    $username = "epiz_34168787";
    $password = "6GmLYqXpc6HEMd";
    $dbname = "epiz_34168787_weatherapp";
    
    // Create new database connection
    $conn = new mysqli($servername, $username, $password, $dbname);
    $table = "CREATE TABLE IF NOT EXISTS weather (
        Date DATE,
        Address VARCHAR(255),
        Temperature FLOAT,
        Humidity INT
    );";
    $conn->query($table);
    
    // Check if connection to database was successful
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    
    // Define function to add new weather data to database or update existing data
    function set($conn, $city)
    {
        $date = date('Y-m-d');
        // Retrieve weather data for given city from OpenWeatherMap API
        $api = "https://api.openweathermap.org/data/2.5/weather?q=" . $city . '&units=metric&appid=a996fdcd6c4f2a16fd83338c84ab0236';
        $json_data = file_get_contents($api);
        $response = json_decode($json_data, true);
        // Extract necessary data from API response
        $name = $response["name"];
        $temperature = $response["main"]["temp"];
        $humidity = $response["main"]["humidity"];
        // Check if weather data for given city on current date already exists in database
        $code = "SELECT * FROM weather WHERE Address='$name' AND Date='$date';";
        $test = $conn->query($code);
        // If weather data for given city on current date already exists in database, update it
        if (mysqli_num_rows($test) == 1) {
            $code1 = "UPDATE `weather` SET `Date`='$date',`Address`='$city',`Temperature`=$temperature,`Humidity`=$humidity WHERE Address='$city' AND Date='$date';";
            $conn->query($code1);
        } else {
            $code2 = "INSERT INTO `weather`(`Date`, `Address`, `Temperature`, `Humidity`) VALUES ('$date','$city',$temperature,$humidity)";
            $conn->query($code2);
        }
    }
    
    // Define function to retrieve weather data for given city from database
    function get($conn, $city)
    {
        // Select weather data for given city from database in descending order by date
        $code11 = "SELECT * FROM weather WHERE Address='$city' ORDER BY Date DESC;";
        $result = $conn->query($code11);
        
        // Check if any weather data was retrieved from database
        $len = mysqli_num_rows($result);
        
        if ($len >= 7) {
            $response = "<h1>Last 7 days weather detail of $city:</h1>
            <table>
                    <tr>
                        <th>Date</th>
                        <th>Temperature</th>
                        <th>Humidity</th>
                    </tr>";
            $count = 0;
            while ($count < 7 && $row = $result->fetch_assoc()) {
                $response .= "<tr>
                        <td>" . $row["Date"] . "</td>
                        <td>" . $row["Temperature"] . "</td>
                        <td>" . $row["Humidity"] . "</td>
                    </tr>";
                $count++;
            }
            $response .= "</table>
            <style>
                table td,th{
                    padding: 10px;
                    border: 2px solid blue;
                    text-align:center;
                }
                body{
                    background-color:tan;
                }
            </style>";
        } else {
            $response = "<p>No data found.</p>";
        }
        
        // Return the response
        echo $response;
    }
    
    if (isset($_POST['search'])) {
        $city = $_REQUEST['search'];
        set($conn, $city);
        get($conn, $city);
    }
?>
