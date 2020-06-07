#include <stdio.h>
#include <stdlib.h>
#include <float.h>
#include <string.h>

#include "emscripten.h"

#define size (18 + 1) * 4 - 1 

void to_string (char *buf, long double v) {
  snprintf(buf, 18, "%.16Lg", v);
} 

char* EMSCRIPTEN_KEEPALIVE createExportCord (int height, int width, int top, int left, int right, int bottom) {

  long double dw = 1.0l;
  dw /= (long double)width;

  long double dh = 1.0l;
  dh /= (long double)height;

  long double xmin = (long double)left;
  long double xmax = (long double)right;
  long double ymin = (long double)top;
  long double ymax = (long double)bottom;

  long double x = (xmin + xmax) / 2.0l;
  long double y = (ymin + ymax) / 2.0l;

  long double w = xmax - xmin;
  long double h = ymax - ymin;

  x = x * dw;
  w = w * dw;
  y = y * dh;
  h = h * dh;

  char x_string[18]; to_string(x_string, x);
  char w_string[18]; to_string(w_string, w);
  char y_string[18]; to_string(y_string, y);
  char h_string[18]; to_string(h_string, h);

  char *result = malloc(size);
  snprintf(result, size, "%s %s %s %s", x_string, y_string, w_string, h_string);
  return result;
}

int main() {
  char tmp[size];
  char* result = createExportCord(101, 121, 10, 10, 50, 50);
  snprintf(tmp, size, "%s", result);
  printf("%s", tmp);
}