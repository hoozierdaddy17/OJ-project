#include <iostream>

int sumTwoNumbers(int a, int b) {
    return a + b;
}

int main() {
    int x,y;
    cin>>x>>y;
    std::cout << sumTwoNumbers(x,y) << std::endl; // Output: 8
    return 0;
}
