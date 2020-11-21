package main.servlets;

import com.google.gson.JsonObject;

import main.JDBCCredential;
import main.User;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.sql.DataSource;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.HashMap;
import java.util.Map;
import java.sql.DriverManager;

@WebServlet(name = "SessionServlet", urlPatterns = "/api/session")
public class Session extends HttpServlet {

    private static final long serialVersionUID = 1L;

    @Resource(name = "jdbc/cs201")
    private DataSource dataSource;

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {

        response.setContentType("application/json"); // Response mime type

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        // write to response
        PrintWriter out = response.getWriter();
        System.out.println("SIGNIN REQUEST:");
        String email = request.getParameter("email");
        String password = request.getParameter("password");
        System.out.println(email);
        System.out.println(password);

        JsonObject responseJsonObject = new JsonObject();

        if (email == null && password == null){
            if (request.getSession().getAttribute("user") != null){
                System.out.println("already login in");
                responseJsonObject.addProperty("status", "success");
                responseJsonObject.addProperty("message", "already login in");
            }
            else{
                responseJsonObject.addProperty("status", "error");
                responseJsonObject.addProperty("message", "not logined in");
            }
            out.println(responseJsonObject.toString());
        }
        else{
            try {
                Class.forName("com.mysql.cj.jdbc.Driver");
            } catch (ClassNotFoundException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
            try {
                Connection dbcon = DriverManager.getConnection(
				JDBCCredential.url, JDBCCredential.username, JDBCCredential.password);

                String query = "select *\n" +
                        "from Users\n" +
                        "where email = ?" +
                        "and password = ?";

                // Declare our statement
                PreparedStatement statement = dbcon.prepareStatement(query);

                statement.setString(1, email);
                statement.setString(2, password);

                System.out.println(statement);

                // Perform the query
                ResultSet rs = statement.executeQuery();

                System.out.println("getting login");

                if (rs.next()) {
                    // login success
                    System.out.println("\tlogin success!!");
                    User user = new User(
                            rs.getInt("userId"),
                            rs.getString("firstName"),
                            rs.getString("lastName"),
                            rs.getString("email"),
                            rs.getString("password")
                    );
                    System.out.println("hello there! \n");

                    request.getSession().setAttribute("user", user);

                    responseJsonObject.addProperty("status", "success");
                    responseJsonObject.addProperty("message", "login in success");
                }
                else{
                    System.out.println("login fail");
                    responseJsonObject.addProperty("status", "fail");
                    responseJsonObject.addProperty("message", "Invalid email or password. Please try again.");
                }
                response.setStatus(200);
                out.println(responseJsonObject.toString());
                rs.close();
                statement.close();
                dbcon.close();
            }
            catch (Exception e) {
                System.out.println("error");
                e.printStackTrace();

                // write error message JSON object to output
                responseJsonObject.addProperty("status", "fail");
                responseJsonObject.addProperty("message", e.getMessage());

                // set response status to 500 (Internal Server Error)
                response.setStatus(500);
            }
        }

        out.close();
    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        System.out.println("deleting current user session...");

        resp.setContentType("application/json"); // Response mime type

        PrintWriter out = resp.getWriter();
        JsonObject responseJsonObject = new JsonObject();

        // right now Cors doesn't allow cookies
        HttpSession session = req.getSession(false);
        if (session != null){
            User user = (User) session.getAttribute("user");
            System.out.println("deleted user" + user.toString());
            req.getSession().removeAttribute("user");
            responseJsonObject.addProperty("user", user.firstName);
            responseJsonObject.addProperty("message", "deleted user session");
        }
        else responseJsonObject.addProperty("message", "user session not exist");
        System.out.println(responseJsonObject.toString());
        out.println(responseJsonObject.toString());
        resp.setStatus(200);
        out.close();
    }
}

