package main.servlets;

import com.google.gson.JsonObject;

import main.JDBCCredential;

import java.sql.Statement;
import javax.annotation.Resource;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;
import java.sql.DriverManager;
import main.JDBCCredential;
import main.User;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

@WebServlet(name = "UsersServlet", urlPatterns = "/api/users")
public class Users extends HttpServlet{

    private static final long serialVersionUID = 1L;

    @Resource(name = "jdbc/cs201")
    private DataSource dataSource;

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        resp.setContentType("application/json"); // Response mime type
		PrintWriter out = resp.getWriter();
		try {
            Class.forName("com.mysql.jdbc.Driver");
        }
        catch(ClassNotFoundException e) {

        }

        String email = req.getParameter("email");
        String password = req.getParameter("password");
        String fname = req.getParameter("fname");
        String lname = req.getParameter("lname");

        JsonObject responseJsonObject = new JsonObject();

        if (email.equals("") || password.equals("") || fname.equals("") || lname.equals("")){
            responseJsonObject.addProperty("message", "some fields are empty");
            out.println(responseJsonObject.toString());
            resp.setStatus(500);
        }
        else{
            try (Connection dbcon = DriverManager.getConnection(JDBCCredential.url, 
            		JDBCCredential.username, JDBCCredential.password)){

            	String query = "SELECT * from Users where email = ?";
				PreparedStatement stmt = dbcon.prepareStatement(query);
				stmt.setString(1, email);
				ResultSet rs = stmt.executeQuery();
				// if already registered
				if (rs.next()){
					System.out.println("no data");
					responseJsonObject.addProperty("message", "The email is already registered");
				}
				// if not
				else{
					query = "Insert into Users(lastName, firstName, email, password)" +
							"values (?, ?, ?, ?)";
					stmt = dbcon.prepareStatement(query);

					stmt.setString(1, lname);
					stmt.setString(2, fname);
					stmt.setString(3, email);
					stmt.setString(4, password);
					stmt.executeUpdate();
					System.out.println("updating!");
					System.out.println(stmt);
					responseJsonObject.addProperty("message", "success");
					query = "SELECT  LAST_INSERT_ID() as ID";
					stmt = dbcon.prepareStatement(query);
					rs = stmt.executeQuery();
					String id = null;
					while(rs.next()){
						id = rs.getString("ID");
					}
					User user = new User(Integer.parseInt(id), fname, lname, email, password);
					req.getSession().setAttribute("user", user);
					resp.setStatus(200);
				}
				out.println(responseJsonObject.toString());
				rs.close();
				stmt.close();
			} catch (SQLException throwables) {
				responseJsonObject.addProperty("message", "sql exception");
				out.println(responseJsonObject.toString());
				resp.setStatus(500);
            }
        }

        out.close();
    }
    
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws IOException {

		resp.setContentType("application/json"); // Response mime type
		PrintWriter out = resp.getWriter();

		String email = req.getParameter("email");
		String password = req.getParameter("password");
		try {
            Class.forName("com.mysql.jdbc.Driver");
        }
        catch(ClassNotFoundException e) {

        }
		

		BufferedReader br = new BufferedReader(new InputStreamReader(req.getInputStream()));

		String paramToUpdate = br.readLine();

		JsonObject responseJsonObject = new JsonObject();

		try {
			Connection dbcon = DriverManager.getConnection(JDBCCredential.url, 
					JDBCCredential.username, JDBCCredential.password);
			
			String query =  "select *\n" + "from Users\n" + "where email = ?" + "and password = ?";

			
			// Declare our statement
			PreparedStatement statement = dbcon.prepareStatement(query);

			statement.setString(1, email);
			statement.setString(2, password);

			System.out.println(statement);

			// Perform the query
			ResultSet rs = statement.executeQuery();

			
			String currId;
			String currFname = null;
			String currLname = null;
			String currEmail;
			
			while (rs.next()) {

				currId = rs.getString("userId");
				currFname = rs.getString("firstName");
				currLname = rs.getString("lastName");
				currEmail = rs.getString("email");
			}
			

			// paramToUpdate must be decided by the String data, which reads the body
			//have to talk to front end about this
			
			//paramToUpdate should be like 'email = newemail@gmail.com'
			String updateQuery = "UPDATE USERS \n" + "SET " + paramToUpdate + " WHERE firstName = '" + currFname
					+ "' and lastName = '" + currLname + "';";
			
			
			Statement st =  dbcon.createStatement();
			st.execute(updateQuery);

		} catch (Exception e) {
			System.out.println("error");
			e.printStackTrace();
		}

	}
	
	protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws IOException {
		resp.setContentType("application/json"); // Response mime type
		PrintWriter out = resp.getWriter();
		try {
            Class.forName("com.mysql.jdbc.Driver");
        }
        catch(ClassNotFoundException e) {

        }

		String email = req.getParameter("email");
		String password = req.getParameter("password");

		try {
			Connection dbcon = DriverManager.getConnection(JDBCCredential.url, JDBCCredential.username, JDBCCredential.password);

			String query = "select *\n" + "from Users\n" + "where email = ?" + "and password = ?";

			// Declare our statement
			PreparedStatement statement = dbcon.prepareStatement(query);

			statement.setString(1, email);
			statement.setString(2, password);

			System.out.println(statement);

			// Perform the query
			ResultSet rs = statement.executeQuery();

			
			String currId;
			String currFname = null;
			String currLname = null;
			String currEmail;
			
			while (rs.next()) {

				currId = rs.getString("userId");
				currFname = rs.getString("firstName");
				currLname = rs.getString("lastName");
				currEmail = rs.getString("email");
			}
			

			String updateQuery = "SET SQL_SAFE_UPDATES = 0;" + "DELETE FROM USERS WHERE firstName = '" + currFname + "' and lastName = '"
					+ currLname + "'";
			
			Statement st =  dbcon.createStatement();
			st.execute(updateQuery);
			

		} catch (Exception e) {
			System.out.println("error");
			e.printStackTrace();
		}
	}

}
