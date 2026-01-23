---
agent: Generador de Instrucciones
---
Crea un mensaje de commit basado en las reglas o instrucciones de este proyecto sobre commits convencionales que se encuentran en el archivo .github/instructions/commit-messages.instructions.md. Es OBLIGATORIO que uses esas instrucciones SIEMPRE.

Si el usuario no brinda información sobre el cambio, debes basarte en los archivos modificados que no han sido comiteados para generar un mensaje de commit adecuado basado en el estándar mencionado al inicio. Si no hay archivos modificados, pregunta al usuario que te brinde detalles sobre el cambio que desea hacer commit. El usuario puede proporcionar el nombre de un archivo, o una lista de varios separados por comas por lo que debes generar un mensaje de commit adecuado para dichos cambios en esos archivos específicos. Revisa las reglas de seguridad SIEMPRE antes de generar el mensaje de commit y así poder indicar si alguna de las reglas ha sido violada con el cambio realizado o si alguno de los cambios no cumple las reglas o estándares del proyecto.

Si alguna regla es violada, debes indicarlo al usuario para que proceda a realizar las correcciones pertinentes antes de hacer el commit.