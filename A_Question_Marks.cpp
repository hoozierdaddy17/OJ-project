#include <bits/stdc++.h>
using namespace std;
using ll = long long;
#define endl "\n"
#define fo(i, n) for (int i = 0; i < n; i++)
#define all(x) x.begin(), x.end()
#define clr(x) memset(x, false, sizeof(x))
#define sortall(x) sort(all(x))
typedef pair<int, int> pii;
typedef vector<int> vi;
typedef vector<ll> vl;
#define pb push_back
#define VVL(name, rows, cols, init) vector<vector<ll>> name(rows, vector<ll>(cols, init))

// Calculate GCD using Euclidean Algorithm
int gcd(int a, int b)
{
    return (b == 0) ? a : gcd(b, a % b);
}

// Sieve of Eratosthenes
bool isPrime(int num)
{
    if (num <= 1)
        return false;
    if (num <= 3)
        return true;
    if (num % 2 == 0 || num % 3 == 0)
        return false;

    for (int i = 5; i * i <= num; i += 6)
    {
        if (num % i == 0 || num % (i + 2) == 0)
            return false;
    }
    return true;
}

int main()
{
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int t;
    cin >> t;
    while (t--)
    {
        int n;
        cin >> n;
        string s;
        cin >> s;

        unordered_map<char, int> mp;

        for (auto it : s)
        {
            if (it == '?')
                continue;
            mp[it]++;
        }

        int cnt = 0;
        cnt += min(n, mp['A']);
        cnt += min(n, mp['B']);
        cnt += min(n, mp['C']);
        cnt += min(n, mp['D']);

        cout << cnt << endl;
    }
    return 0;
}