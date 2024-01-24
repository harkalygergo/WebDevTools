import java.io.BufferedReader;
import java.io.FileReader;
import java.io.FileNotFoundException;
import java.io.IOException;

public class demo
{
    public static void main (String args[]) throws FileNotFoundException, IOException
    {
        BufferedReader BE = new BufferedReader(new FileReader("demo.txt")); // szóközökkel kell bevinni a különböző tagokat egy sorban
        String sor = BE.readLine();
        int N = Integer.parseInt(sor);
        int[][] T = new int[N][3];
        for(int i = 0; i < N; i++)
        {
            sor = BE.readLine();
            String[] nums = sor.split(" ");
            for(int j = 0; j < 3; j++)
            {
                T[i][j] = Integer.parseInt(nums[j]);
            }
            System.out.println(T[i][0]+" "+T[i][1]+" "+T[i][2]+" ");
        }
        BE.close();
    }
}
