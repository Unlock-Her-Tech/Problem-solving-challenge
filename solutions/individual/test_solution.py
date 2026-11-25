
from solution import countPairs


def test_countPairs():
    assert countPairs([1, 5, 7, -1, 5], 6) == 3
    assert countPairs([3, 3, 3], 6) == 3
    assert countPairs([], 6) == 0
    assert countPairs([1, 2, 3], 10) == 0
    assert countPairs([5, 5], 10) == 1
    assert countPairs([0, 0, 0, 0], 0) == 6

    print("All tests passed!")


if __name__ == "__main__":
    test_countPairs()
