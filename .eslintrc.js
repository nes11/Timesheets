module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "mocha": true
    },
    "plugins": [
        "react"
    ],
    "extends": ['plugin:react/recommended'],
    "parserOptions": {
        "ecmaVersion": 2018,
        "ecmaFeatures": {
            "jsx": true
        },
        "sourceType": "module"
    },
    "rules": {
        "no-console": [2, { "allow": ["info", "error"] }],
        "react/jsx-uses-react": 1,
        "react/prop-types": 0,
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        "no-console": "off"
    }
};
