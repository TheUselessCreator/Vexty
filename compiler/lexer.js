// lexer.js
function lexer(code) {
    const tokens = [];
    const tokenDefinitions = [
        { regex: /\s+/, type: null }, // Ignore whitespace
        { regex: /#.*$/, type: null }, // Ignore single-line comments
        { regex: /VAR/, type: 'VAR' },
        { regex: /FUNCTION|FUNC/, type: 'FUNCTION' },
        { regex: /RETURN/, type: 'RETURN' },
        { regex: /PRINT/, type: 'PRINT' },
        { regex: /IF/, type: 'IF' },
        { regex: /ELSE IF|ELSEIF/, type: 'ELSEIF' },
        { regex: /ELSE/, type: 'ELSE' },
        { regex: /WHILE/, type: 'WHILE' },
        { regex: /\d+(\.\d+)?/, type: 'NUMBER' },  // Numbers (including decimals)
        { regex: /"[^"]*"/, type: 'STRING' },       // Strings
        { regex: /\w+/, type: 'IDENTIFIER' },       // Identifiers (variable names, function names)
        { regex: /=/, type: 'ASSIGN' },              // Assignment operator
        { regex: /\+/, type: 'PLUS' },               // Addition operator
        { regex: /-/, type: 'MINUS' },               // Subtraction operator
        { regex: /\*/, type: 'MULTIPLY' },           // Multiplication operator
        { regex: /\//, type: 'DIVIDE' },             // Division operator
        { regex: /%/, type: 'MODULUS' },             // Modulus operator
        { regex: /==/, type: 'EQUALS' },             // Equality operator
        { regex: /!=/, type: 'NOT_EQUALS' },         // Not equal operator
        { regex: /</, type: 'LT' },                  // Less than operator
        { regex: />/, type: 'GT' },                  // Greater than operator
        { regex: /<=/, type: 'LE' },                 // Less than or equal to
        { regex: />=/, type: 'GE' },                 // Greater than or equal to
        { regex: /\(/, type: 'LPAREN' },             // Left parenthesis
        { regex: /\)/, type: 'RPAREN' },             // Right parenthesis
        { regex: /\{/, type: 'LBRACE' },             // Left brace
        { regex: /\}/, type: 'RBRACE' },             // Right brace
        { regex: /\[/, type: 'LBRACKET' },           // Left square bracket
        { regex: /\]/, type: 'RBRACKET' },           // Right square bracket
        { regex: /;/, type: 'SEMICOLON' },           // Semicolon to terminate statements
        { regex: /,/, type: 'COMMA' },               // Comma for argument separation
        { regex: /\./, type: 'DOT' },                // Dot (for property access, etc.)
        { regex: /\:/, type: 'COLON' },              // Colon (for key-value pairs or other uses)
        // Add more tokens as needed
    ];
    
    while (code.length > 0) {
        let matched = false;

        for (let def of tokenDefinitions) {
            const match = code.match(def.regex);
            if (match && match.index === 0) {
                matched = true;
                if (def.type) {
                    tokens.push({ type: def.type, value: match[0] });
                }
                code = code.slice(match[0].length);
                break;
            }
        }

        // If no regex matches, throw an error to avoid infinite loop
        if (!matched) {
            throw new Error(`Unrecognized token: "${code[0]}" at position ${tokens.length}`);
        }
    }

    return tokens;
}

module.exports = lexer;
