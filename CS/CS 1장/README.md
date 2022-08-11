# CS 1장

날짜: June 19, 2022
발표자: 김은빈, Seo Jun Yoo
주제: CS

- 슬랙봇에 무엇을 사용했나
    
    slack API - slash command 
    
    notion API - 
    

### **이번주 발표자**

---

김은빈, 유서준

### 질문

<aside>
💡 유니코드 vs utf-8

</aside>

- 유니코드 vs utf-8
    
    > Unicode just maps characters to codepoints. It doesn't define how to encode them. A text file does not contain Unicode characters, but bytes/octets that may represent Unicode characters.
    > 
    
    > 유니코드는 문자를 코드 포인트에 매핑해줄 뿐 인코딩 방법을 정의하지 않습니다.
    텍스트 파일에는 유니코드 문자가 아니라 유니코드 문자를 나타낼 수 있는 바이트/옥텟이 저장됩니다.
    > 
    
    [https://stackoverflow.com/a/27939161](https://stackoverflow.com/a/27939161)
    
    - 중국어 문자 `汉` 를 유니코드로 표기하면 `U+6C49`, 이걸 이진수로 표기하면 `01101100 01001001` 가 됩니다.
    - (효율을 위해서) 가변 길이 인코딩을 사용한다면 바이트들을 어떻게 각 문자로 나누어줄 지에 대한 명세가 필요하고 이것이 UTF-8, UTF-16, UTF-32 등입니다.
    - 각 바이트별로 header에 해당하는 prefix를 이용해 위치를 가리킵니다. (상세한 것은 링크/도서 82p 참조)
    
    - [https://stackoverflow.com/a/496335](https://stackoverflow.com/a/496335)
    
    - UTF-8
        - 가변 길이 인코딩
        - ASCII와 역호환 가능
        - ASCII 문자(U+0000 ~ U+007F)는 1바이트
        - U+0080 ~ U+07FF는 2바이트
        - U+0800 ~ U+FFFF는 3바이트
        - U+10000 ~ U+10FFFF 4바이트
        - 영어 텍스트에는 좋고 아시아 텍스트에는 좋지 않다.
    - UTF-16
        - 가변 길이 인코딩
        - U+0000 ~ U+FFFF는 2바이트
        - U+10000 ~ U+10FFFF는 4바이트
        - 영어 텍스트에는 좋지 않고 아시아 텍스트에는 좋다.
    - UTF-32
        - 고정 길이 인코딩
        - 모든 글자에는 4바이트 사용
        - 메모리를 많이 먹지만 속도가 빠르다. 잘 사용되지 않는다.
    
    표기 예제: [https://stackoverflow.com/questions/5290182/how-many-bytes-does-one-unicode-character-take/23410670#23410670](https://stackoverflow.com/questions/5290182/how-many-bytes-does-one-unicode-character-take/23410670#23410670)
    

<aside>
💡 (은빈)Math.Fraction이 뭔가요
js 에서는 부동소수점 방식으로 실수를 표현하기 때문에 0.1 + 0.2 ≠ 0.3인 것.

언어에 따라 다른가?
(수정) C에서는 부동소수점 사용하려면 선언 방식을 지정하여 쓸수 있다. (float)

</aside>

**참고자료**

---

[How to check if hex color is "too black"?](https://stackoverflow.com/questions/12043187/how-to-check-if-hex-color-is-too-black)

[[C/C++] 고정 소수점의 모든 것 (All about Fixed Point)](http://arkainoh.blogspot.com/2017/11/fixed-point.html)

[C 프로그래밍 입문/부동소수형 데이터 - 위키책](https://ko.wikibooks.org/wiki/C_%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D_%EC%9E%85%EB%AC%B8/%EB%B6%80%EB%8F%99%EC%86%8C%EC%88%98%ED%98%95_%EB%8D%B0%EC%9D%B4%ED%84%B0)

### 다음 주 주제

- 2장
- 회고 날짜 정하기

### 건의사항

- 스터디 블로그를 만들자(내용중 베스트를 뽑아서 포스팅하자)
- 질문을 기록했으면 좋겠다.

### Action Item

- 질문 테이블을 만들자